const uuid = require("uuid");

const express = require("express");

const members = require("../../json-data/members.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please include a name and email." });
  }

  members.push(newMember);

  res.json(members);
});

// update member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name || member.name;
        member.email = updMember.email || member.email;

        return res.json({
          msg: `Member ${req.params.id} has been updated.`,
          member,
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    newMembers = members.filter(
      (member) => member.id !== parseInt(req.params.id)
    );

    res.json({
      msg: `Member ${req.params.id} deleted`,
      members: newMembers,
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
