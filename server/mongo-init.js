db.auth('admin','admin-password');

db = db.getSiblingDB("melochord");
db.createUser(
    {
        user: "agent1",
        pwd: "123",
        roles:[{ role: "readWrite", db: "melochord"}]
    }
);