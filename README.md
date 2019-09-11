# DataStore

This is an node server which allows a registered user to Create, Viwe and Delete user data.

The following routes is used for data operations

# Registration:
localhost:3000/authentication/register (Post request)

# Login
localhost:3000/authentication/login (Get request)

# Insert
localhost:3000/dataEntry/insert (Post request)

# View
localhost:3000/dataEntry/view (Get request)

# Delete
localhost:3000/dataEntry/delete (Delete request)

# This uses mongodb as a data store.

On successful login user token will be generated and sent as a response. All other data operations like Insert, View and Delete rquired the user token to be passed in header. The token will expire once in 10 Minutes. So, the user has to login again. 