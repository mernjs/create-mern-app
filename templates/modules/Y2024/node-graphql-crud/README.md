# GraphQL CRUD

## Create User

```js
mutation {
  createUser(name: "Vijay Pratap Singh", email: "vijay.gql@getnada.com", password: "123456"){
    _id
    name,
    email,
    password
  }
}
```

## Get Users

```js
query {
  users{
    _id
    name,
    email,
    password
  }
}
```

## Update User

```js
mutation {
  updateUser(_id: "62bcef0500fe2b833d0044fe", name: "Update Name", email: "update.name@getnada.com"){
    _id
    name,
    email,
    password
  }
}
```

## Delete User

```js
mutation {
  removeUser(_id: "64204b450b15d600211654a6"){
    _id
  }
}
```
