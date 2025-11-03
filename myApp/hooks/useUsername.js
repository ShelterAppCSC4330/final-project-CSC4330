import { useState } from 'react';

export default function useUsername(defaultName = 'Username') {
  const [username, setUsername] = useState(defaultName);
  return { username, setUsername };
}
