import React from "react";
import styled, { css } from "styled-components";
import Theme, { mqLess, breakpoints, px2rem } from "../theme";
import { Button } from "./button";
import Column from "./column";

const Contact = () => (
  <Column>
    <Wrapper>
      <h1>Got an idea for a project?</h1>

      <p>
        Need a website? Web-enabled software to streamline your business? Just
        some advice?
      </p>

      <form
        acceptCharset="UTF-8"
        action="https://usebasin.com/f/608feeaf0fac"
        method="POST"
      >
        <fieldset>
          <Row>
            <Col>
              <Field>
                <Label htmlFor="message">Message*</Label>
                <TextArea
                  id="message"
                  name="message"
                  rows={9}
                  required
                ></TextArea>
              </Field>
            </Col>
            <Col>
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" />
              </Field>

              <Field>
                <Label htmlFor="email">Email*</Label>
                <Input type="email" id="email" name="email" required />
              </Field>

              <Field className="checkbox">
                <Input
                  type="checkbox"
                  id="contact-permission"
                  name="contact-permission"
                  value="Granted"
                  required
                />
                <Label htmlFor="contact-permission">
                  Please get back to me ASAP and treat my details with respect
                  in line with your{" "}
                  <a href="/privacy-policy/">privacy policy</a>.
                </Label>
              </Field>
            </Col>
          </Row>

          <input type="hidden" name="source" value="https://gotripod.com/" />
          <SButton type="submit">Send it</SButton>
        </fieldset>
      </form>
    </Wrapper>
  </Column>
);

export default Contact;

const SButton = styled(Button)`
  background: #666;
`;

const Wrapper = styled.section`
  color: #ededed;
  text-align: center;
  background: linear-gradient(to right, #4291ce, #6ba9d9);
  padding: ${px2rem(Theme.gutter * 4)} ${px2rem(Theme.gutter * 8)};
  margin-bottom: ${Theme.gutter * 4}px;

  h1 {
    font-size: 2rem;
    margin-top: 0;
  }

  fieldset {
    border: 0;
  }

  ${mqLess(breakpoints.medium)} {
    padding: ${Theme.gutter * 4}px ${px2rem(Theme.gutter)};
  }
`;

const Col = styled.div`
  padding: ${px2rem(Theme.gutter)} ${px2rem(Theme.gutter * 2)};
  flex: 1;

  ${mqLess(breakpoints.medium)} {
    padding: 0 0;
  }
`;
const Field = styled.div`
  text-align: left;
  margin-bottom: ${Theme.gutter * 2}px;

  &.checkbox {
    display: flex;
    position: relative;
  }

  &.checkbox input {
    width: auto;
    opacity: 0;
    position: absolute;
  }

  &.checkbox input:checked + label:after {
    content: "";
  }

  &.checkbox label {
    width: 100%;
    padding-left: 50px;
    position: relative;
  }

  &.checkbox label:before {
    content: "";
    background-color: rgba(255, 255, 255, 0.3);
    position: absolute;
    top: 0;
    width: 40px;
    height: 40px;
    left: 0;
  }

  &.checkbox label:after {
    position: absolute;

    top: 9px;

    left: 7px;

    height: 16px;

    width: 26px;

    border-left: 8px solid;

    border-bottom: 8px solid;
    transform: rotate(-45deg);
  }
`;
const Row = styled.div`
  display: flex;

  ${mqLess(breakpoints.medium)} {
    display: block;
  }
`;

const InputStyle = css`
  color: #ededed;
  background-color: rgba(255, 255, 255, 0.3);
  width: 100%;
  font-size: 100%;
  resize: none;
  border: 0;
  vertical-align: top;
  padding: ${Theme.gutter}px;
  transition: background-color 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
`;

const Input = styled.input`
  ${InputStyle}
`;
const TextArea = styled.textarea`
  ${InputStyle}
`;

const Label = styled.label`
  margin-bottom: ${Theme.gutter}px;
  display: inline-block;
`;
