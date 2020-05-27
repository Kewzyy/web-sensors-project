
db.createUser({
  user: "user",
  pwd: "secretPassword",
  roles: [
    {
      role: "dbOwner",
      db: "webapp"
    }
  ]
})

db.users.insert({
  name: "user12345"
})