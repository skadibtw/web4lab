function checkLogin(username, password) {
    let errors = [];

    if (!username || username.length <= 4) {
        errors.push('Имя пользователя должно быть длиннее 4 символов');
    }
    if (!password || password.length <= 4) {
        errors.push('Пароль должен быть длиннее 4 символов');
    }

    return errors;
}
export default checkLogin;