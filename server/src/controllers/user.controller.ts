import { Route, Tags, Post, Body } from 'tsoa';
import { User } from '../models';
import {
    ILoginPayload,
    loginUser,
    registerUser,
    IRegisterPayload,
    IValidateUsernamePayload,
    validateUsername,
    IValidateTokenIdPayload,
    validateTokenId,
} from '../repositories/user.repository';

export interface IUserResponse {
    user: User | null;
    accessToken: string | null;
}

export interface IValidateResponse {
    valid: boolean;
    status: string;
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
    @Post('/register/validate/username')
    public async validateUsername(@Body() body: IValidateUsernamePayload): Promise<IValidateResponse> {
        const result = await validateUsername(body);

        return result;
    }
    @Post('/register/validate/tokenId')
    public async validateTokenId(@Body() body: IValidateTokenIdPayload): Promise<IValidateResponse> {
        const result = await validateTokenId(body);

        return result;
    }
}
