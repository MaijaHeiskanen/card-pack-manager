import { Route, Tags, Post, Body } from 'tsoa';
import { User } from '../models';
import {
    ILoginPayload,
    loginUser,
    registerUser,
    LOGIN_STATUS,
    IRegisterPayload,
} from '../repositories/user.repository';

export interface IUserResponse {
    user: User | null;
    accessToken: string | null;
}

@Route('users')
@Tags('User')
export default class UserController {
    @Post('/login')
    public async loginUser(@Body() body: ILoginPayload): Promise<IUserResponse> {
        const result = await loginUser(body);

        return result;
    }
    @Post('/register')
    public async registerUser(@Body() body: IRegisterPayload): Promise<IUserResponse> {
        const result = await registerUser(body);

        return result;
    }
}
