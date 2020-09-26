import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

import { beneficios } from "./beneficio.reducer";
import { cartoes } from "./cartao.reducer";
import { emprestimos } from "./emprestimo.reducer";
import { enderecos } from "./endereco.reducer";
import { pessoas } from "./pessoa.reducer";
import { telefones } from "./telefone.reducer";

const rootReducer = combineReducers({
  form: formReducer,
  authentication,
  users,
  alert,
  beneficios,
  cartoes,
  emprestimos,
  enderecos,
  pessoas,
  telefones
});

export default rootReducer;