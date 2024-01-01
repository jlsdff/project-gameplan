"use client";
import React, { useState, useMemo, useReducer } from "react";
import { Input, Button, Checkbox, Link } from "@nextui-org/react";

function reducer(state, action) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

  switch (action.type) {
    case "email":
      return {
        ...state,
        email: {
          value: action.value,
          isValid: emailRegex.test(action.value),
          isTouched: true,
        },
      };

    case "password":
      return {
        ...state,
        password: {
          value: action.value,
          isValid: action.value.length > 5,
          isTouched: true,
        },
      };

    default:
      return state;
  }
}

export default function LoginForm() {
  const [state, dispatch] = useReducer(reducer, {
    email: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    password: {
      value: "",
      isValid: false,
      isTouched: false,
    },
  });

  return (
    <section className="max-w-96 w-96 rounded-lg border-2 border-neutral-100/50 p-4  ">
      <h1 className="text-3xl font-bold text-center">Admin Login</h1>
      <div className="flex flex-col gap-2 mt-4 ">
        <div className="w-full ">
          <Input
            size="md"
            type="email"
            isRequired
            variant="flat"
            label="Email"
            onValueChange={(value) => dispatch({ type: "email", value })}
            isInvalid={state.email.isTouched && !state.email.isValid}
            errorMessage={
              state.email.isTouched && !state.email.isValid
                ? "Please enter a valid email"
                : ""
            }
          />
        </div>
        <div>
          <Input
            type="password"
            size="md"
            isRequired
            variant="flat"
            label="Password"
            onValueChange={(value) => dispatch({ type: "password", value })}
          />
        </div>
        <div className="flex justify-between mb-3">
          <Checkbox size="sm">
            <span className=" text-opacity-40 ">Remember me?</span>
          </Checkbox>

          <Link href="#" className="text-sm text-blue-400 decoration-solid ">
            Forgot Password?
          </Link>
        </div>
        <Button
          variant="shadow"
          color="primary"
          disabled={!state.email.isValid && !state.password}
        >
          Login
        </Button>
      </div>
    </section>
  );
}
