import { v1 as uuidv1 } from 'uuid';



function generateId() {
  return uuidv1();
}

export default generateId