import { nanoid } from 'nanoid';
import { history, useParams } from 'umi';

export default function Index() {
  const { docId } = useParams<{ docId: string }>();

  if (!docId) {
    history.push(`/${nanoid()}`);
  }
  return null;
}
