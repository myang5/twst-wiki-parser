import { capitalize, chain } from 'lodash';

const capitalizeName = (name) =>
  chain(name)
    .words()
    .map((word) => capitalize(word))
    .join(' ')
    .value();

export default capitalizeName;
