import React, { useState } from "react";
import {
  Container,
  Button,
  Input,
  Flex,
  Checkbox,
  Text,
  IconButton,
} from "theme-ui";
import EditIcon from "../images/edit.png";
import DeleteIcon from "../images/delete.png";

export default () => {
  const tasks = [
    { id: 1, title: "Hello WOrld", status: true },
    { id: 2, title: "Hello WOrld", status: true },
    { id: 3, title: "Hello WOrld", status: true },
    { id: 4, title: "Hello WOrld", status: true },
  ];
  const [checked, setChecked] = useState(false);
  return (
    <Container>
      <h1 style={{ color: "#bb99ff", textAlign: "center" }}>Todo App</h1>
      <Flex sx={{ justifyContent: "center", alignItems: "end" }} mt="4">
        <Input
          name="task"
          sx={{ width: "40%", margin: "0 5px" }}
          placeholder="Enter Task"
        />
        <Button style={{ margin: "0 5px" }}>Add Task</Button>
      </Flex>
      <ul style={{ padding: "0px" }}>
        {tasks.map((task) => {
          return (
            <Flex
              as="li"
              sx={{
                backgroundColor: "#55476f",
                width: ["90%", null, "75%"],
                margin: "20px auto",
                padding: "5px",
                borderRadius: "5px",
              }}
              my="3"
            >
              <div style={{ margin: "auto 0" }}>
                <Checkbox checked={task.status} />
              </div>
              <Text
                sx={{
                  fontSize: 4,
                  fontWeight: "bold",
                }}
              >
                {task.title}
              </Text>
              <div style={{ marginLeft: "auto" }}>
                <IconButton aria-label="Toggle dark mode">
                  <img src={EditIcon} />
                </IconButton>
                <IconButton aria-label="Toggle dark mode">
                  <img src={DeleteIcon} />
                </IconButton>
              </div>
            </Flex>
          );
        })}
      </ul>
    </Container>
  );
};