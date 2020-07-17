import { useState } from 'react';
import Authentication from '../../../../renderer-process/user/Authentication';

const useAuthenticate = (inicital = null) => {
    const [ user, setData ] = useState(inicital);

    Authentication.registerCallbacks(
        user => setData(user),
        () => setData({})
    );

    const authenticate = (username, password) => {
        Authentication.authenticate(username, password);
    }

    return [ user, authenticate ];
}

export default useAuthenticate;