import { Route, Tags, Post, Body } from 'tsoa';
import { User } from '../models';
import { IVerifyUserPayload, verifyUser } from '../repositories/user.repository';

@Route('users')
@Tags('User')
export default class UserController {
    @Post('/verify')
    public async verifyUser(@Body() body: IVerifyUserPayload): Promise<User | null> {
        return verifyUser(body);
    }
}
