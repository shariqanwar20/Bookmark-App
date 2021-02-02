import React from "react";
import {
  Container,
  Button,
  Input,
  Flex,
  Checkbox,
  Text,
  IconButton,
  Label,
  Box,
  Spinner,
} from "theme-ui";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { dark } from "@theme-ui/presets";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

const GET_TODO = gql`
  query {
    todoList {
      id
      task
      status
    }
  }
`;

const ADD_TODO = gql`
  mutation($task: String!) {
    addTodo(task: $task) {
      task
    }
  }
`;

const UPDATE_TODO = gql`
  mutation($id: ID!, $task: String!) {
    updateTodo(id: $id, task: $task) {
      task
    }
  }
`;

const UPDATE_TODO_CHECKBOX = gql`
  mutation($id: ID!) {
    updateTodoCheckbox(id: $id) {
      status
    }
  }
`;

const DELETE_TODO = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      task
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_TODO);

  const [addTodo] = useMutation(ADD_TODO);
  const addTask = (title: string) => {
    addTodo({
      variables: {
        task: title,
      },
      refetchQueries: [{ query: GET_TODO }],
    });
  };

  const [updateTodo] = useMutation(UPDATE_TODO);
  const updateTask = (id, title: string) => {
    updateTodo({
      variables: {
        id: id,
        task: title,
      },
      refetchQueries: [{ query: GET_TODO }],
    });
  };

  const [deleteTodo] = useMutation(DELETE_TODO);
  const deleteTask = (id) => {
    deleteTodo({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_TODO }],
    });
  };

  const [updateTodoCheckbox] = useMutation(UPDATE_TODO_CHECKBOX);
  const updateTodoCheckboxTask = (id) => {
    updateTodoCheckbox({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_TODO }],
    });
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("*Enter Task Name"),
  });

  const handleEdit = async (refId: any) => {
    const result: any = await Swal.mixin({
      input: "text",
      confirmButtonText: "Update",
      showCancelButton: true,
    }).queue([
      {
        titleText: "Enter Task",
        input: "text",
      },
    ]);
    if (result.value) {
      const { value } = result;
      console.log(value);
      updateTask(refId, value[0]);
    }
  };

  return (
    <Container>
      <h1 style={{ color: dark.colors.primary, textAlign: "center" }}>
        Todo App
      </h1>
      <Formik
        initialValues={{ title: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({
            values: { title: "" },
          });
          console.log(values);
          addTask(values.title);
        }}
      >
        {({ values, handleSubmit, handleChange, touched, errors }) => (
          <Box
            as="form"
            sx={{
              margin: "0 auto",
            }}
            mt="4"
            onSubmit={handleSubmit}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
              }}
            >
              <Input
                name="title"
                sx={{ width: "40%", margin: "0 5px" }}
                placeholder="Enter Task"
                value={values.title}
                onChange={handleChange}
              />

              <Button style={{ margin: "0 5px" }} type="submit">
                Add Task
              </Button>
            </div>
            {touched.title && errors.title ? (
              <p
                style={{ fontSize: "15px", color: "red", textAlign: "center" }}
              >
                {errors.title}
              </p>
            ) : null}
          </Box>
        )}
      </Formik>

      {loading ? (
        <div style={{ margin: "15px auto", textAlign: "center" }}>
          <Spinner />
        </div>
      ) : (
        <ul style={{ padding: "0px" }}>
          {console.log(data)}
          {data &&
            data.todoList.map((task, ind) => {
              return (
                <Flex
                  as="li"
                  key={ind}
                  sx={{
                    backgroundColor: dark.colors.highlight,
                    width: ["90%", null, "75%"],
                    margin: "20px auto",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                  my="3"
                >
                  <div style={{ margin: "auto 0" }}>
                    <Label>
                      <Checkbox
                        defaultChecked={task.status}
                        onChange={() => {
                          updateTodoCheckboxTask(task.id);
                        }}
                      />
                    </Label>
                  </div>
                  <Text
                    sx={{
                      fontSize: 4,
                      fontWeight: "bold",
                    }}
                  >
                    {task.task}
                  </Text>
                  <div style={{ marginLeft: "auto" }}>
                    <IconButton
                      aria-label="Toggle dark mode"
                      onClick={() => {
                        console.log(task.id);
                        handleEdit(task.id);
                      }}
                    >
                      <EditIcon htmlColor={dark.colors.primary} />
                    </IconButton>
                    <IconButton
                      aria-label="Toggle dark mode"
                      onClick={() => {
                        deleteTask(task.id);
                      }}
                    >
                      <DeleteIcon htmlColor={dark.colors.primary} />
                    </IconButton>
                  </div>
                </Flex>
              );
            })}
        </ul>
      )}
    </Container>
  );
};
