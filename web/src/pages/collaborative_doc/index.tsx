import ReconnectingWebSocket from 'reconnecting-websocket';
import sharedb from 'sharedb/lib/client';
import richText from 'rich-text';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { Socket } from 'sharedb/lib/sharedb';
import ObjectID from 'bson-objectid';
import tinycolor from 'tinycolor2';

import { useEffect } from 'react';

sharedb.types.register(richText.type);
Quill.register('modules/cursors', QuillCursors);

const colors = {};
const collection = 'examples';
const id = 'richtext';
const presenceId = new ObjectID().toString();

const socket = new ReconnectingWebSocket('ws://localhost:8080');
const connection = new sharedb.Connection(socket as Socket);
const doc = connection.get(collection, id);

export default function CollaborativeDoc() {
  useEffect(() => {
    doc.subscribe(function (err) {
      if (err) throw err;
      initQuill();
    });
  }, []);

  function initQuill() {
    const quill = new Quill('#editor', {
      modules: { cursors: true },
    });
    const cursors = quill.getModule('cursors');

    quill.setContents(doc.data);

    quill.on('text-change', function (delta, oldDelta, source) {
      if (source !== 'user') return;
      doc.submitOp(delta);
    });

    doc.on('op', function (op, source) {
      if (source) return;
      quill.updateContents(op);
    });

    var presence = doc.connection.getDocPresence(collection, id);
    presence.subscribe(function (error) {
      if (error) throw error;
    });
    var localPresence = presence.create(presenceId);

    quill.on('selection-change', function (range, oldRange, source) {
      // We only need to send updates if the user moves the cursor
      // themselves. Cursor updates as a result of text changes will
      // automatically be handled by the remote client.
      if (source !== 'user') return;
      // Ignore blurring, so that we can see lots of users in the
      // same window. In real use, you may want to clear the cursor.
      if (!range) return;
      // In this particular instance, we can send extra information
      // on the presence object. This ability will vary depending on
      // type.
      range.name = window.userInfo.username;
      localPresence.submit(range, function (error) {
        if (error) throw error;
      });
    });

    presence.on('receive', function (id, range) {
      colors[id] = colors[id] || tinycolor.random().toHexString();
      var name = (range && range.name) || 'Anonymous';
      cursors.createCursor(id, name, colors[id]);
      cursors.moveCursor(id, range);
    });

    return quill;
  }

  return <div id="editor"></div>;
}
