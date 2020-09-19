import "core-js/stable";
import "regenerator-runtime/runtime";
import './../node_modules/mp-front-end/src/App.scss'
import './test.scss'
import * as Admin from 'mp-front-end';
export default function Upload() {
  return (
    <Admin.AuthContext.Provider value={{}}>
      <Admin.Dashboard/>
    </Admin.AuthContext.Provider>
    
    // <div>Hello this is my upload page</div>
  );
}


