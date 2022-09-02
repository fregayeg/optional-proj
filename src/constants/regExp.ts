/*
 * email validation (e.g: johdoe.154@test-fye.com)
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * at least one digit
 * AND at least one lower case
 * AND at least one uppercase case
 * AND at least 6 from the mentioned characters
 */
export const password: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;

export default {
    email,
    password
}
