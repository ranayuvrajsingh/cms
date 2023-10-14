import { Ability, AbilityBuilder } from '@casl/ability';
import { storage } from '../../services/config/storage';
import Store from '../index';

const ability = new Ability();

export default (action,subject) => {

    return ability.can(action,subject);
};

Store.subscribe(() => {
    let auth = Store.getState();

    if(auth.auth.data!=null){
        let authh = auth.auth.data

    ability.update(defineRulesFor(authh));
    }
    else{
        console.log('Permissions are not loaded yet');
    }
    
})


const defineRulesFor = (auth) => {
    const permissions = auth.rules;

    const {can,rules} = new AbilityBuilder();

    if(permissions) {
        permissions.forEach((p) => {
            can(p[0],p[1]);
        })
    }

    return rules;
}



  



