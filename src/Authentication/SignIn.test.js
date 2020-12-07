import React from "react";
import { shallow } from "enzyme";
import SignIn from "./SignIn";

describe("Login Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<SignIn/>);
    });
    test("render a button with text of `Sign In`", () => {
        const button=wrapper.find('button');
        const result1=button.text();
        expect(result1).toBe('Sign In');
        
    });

     test("render the initial value of state in a input", () => {
        const username=wrapper.find('#username');
        const result1=username.text();
        expect(result1).toBe('');

        const password=wrapper.find('#password');
        const result2=password.text();
        expect(result2).toBe('');
        
    });

});
