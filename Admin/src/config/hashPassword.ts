import bcrypt from 'bcrypt';

const hashPassword = async (password: String) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const matchPassword = async (password: string, hashedPassword: string) => {
    const validPassword = await bcrypt.compare(password, hashedPassword);
    if (validPassword) {
        return true;
    } else {
        return false;
    }
};

const passwordTool = {
    hashPassword,
    matchPassword
};

export default passwordTool;
