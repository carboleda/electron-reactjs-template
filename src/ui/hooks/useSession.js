import Cookies from 'js-cookie';

const useSession = () => {
    const saveSession = (user) => {
        const cookieValue = JSON.stringify({
            id: user.id,
            username: user.username
        });
        const expireAt = new Date();
        expireAt.setMinutes(expireAt.getMinutes() + 30);
        Cookies.set('_ld', cookieValue, { expires: expireAt, path: '/' });
    };
    const getData = () => { Cookies.get('_ld') };
    const isLogged = () => Cookies.get('_ld') !== undefined;
    const logout = () => { Cookies.remove('_ld', { path: '/' }); };
    return { saveSession, getData, isLogged, logout };
};

export default useSession;