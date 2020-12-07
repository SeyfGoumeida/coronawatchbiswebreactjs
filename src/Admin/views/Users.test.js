import React from "react";
import { shallow } from "enzyme";
import Users from "./Users";

describe("Users Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Users/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());
        const btn1=wrapper.find('#add_user');
        const result1=btn1.text();
        expect(result1).toBe('ADD USER');
        
        const btn2=wrapper.find('#add_account');
        const result2=btn2.text();
        expect(result2).toBe('Add account');
        
    });

    test("render the text of headers", () => {
        const h5=wrapper.find('h5.card-title');
        const result1=h5.text();
        expect(result1).toBe('Users');

        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Users');

        const modal=wrapper.find('h5.modal-title');
        const result3=modal.text();
        expect(result3).toBe(' Create a new user account');
    });

    test("render the header of table", () => {
        const th1=wrapper.find('#th1');
        const result1=th1.text();
        expect(result1).toBe('USERNAME');

        const th2=wrapper.find('#th2');
        const result2=th2.text();
        expect(result2).toBe('EMAIL');

        const th3=wrapper.find('#th3');
        const result3=th3.text();
        expect(result3).toBe('TYPE');

        const th4=wrapper.find('#th4');
        const result4=th4.text();
        expect(result4).toBe('FIRST NAME');

        const th5=wrapper.find('#th5');
        const result5=th5.text();
        expect(result5).toBe('LAST NAME');
    });

    test("render the initial value of state in a input", () => {
        const input1=wrapper.find('#user_type');
        const result1=input1.text();
        expect(result1).toBe('ModeratorRedactorHealth Agent');

        const input2=wrapper.find('#first_name');
        const result2=input2.text();
        expect(result2).toBe('');

        const input3=wrapper.find('#last_name');
        const result3=input3.text();
        expect(result3).toBe('');

        const input4=wrapper.find('#username');
        const result4=input4.text();
        expect(result4).toBe('');

        const input5=wrapper.find('#email');
        const result5=input5.text();
        expect(result5).toBe('');

        const input6=wrapper.find('#password');
        const result6=input6.text();
        expect(result6).toBe('');

        const input7=wrapper.find('#password2');
        const result7=input7.text();
        expect(result7).toBe('');
        
        
    });

});