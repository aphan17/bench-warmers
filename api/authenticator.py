# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.usersQueries import UserQueries, UserOut, UserOutWithPassword


class UserAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        users: UserQueries,
    ):
        # Use your repo to get the user based on the
        # username (which could be an email)
        print(email)
        userEmail = users.get_one_user(email)
        print(userEmail)
        return userEmail

    def get_account_getter(
        self,
        users: UserQueries = Depends(),
    ):
        # Return the user. That's it.
        return users

    def get_hashed_password(self, user: UserOutWithPassword):
        # Return the encrypted password value from your
        # user object
        return user.password

    def get_account_data_for_cookie(self, user: UserOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.username, UserOut(**user.dict())


authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
