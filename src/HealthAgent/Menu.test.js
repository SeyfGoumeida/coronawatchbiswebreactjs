import React from "react";
import { shallow } from "enzyme";
import Menu from "./Menu";

describe("Redactor Menu Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Menu/>);
    });
    test("render a logo", () => {
        const logo=wrapper.find('#logoIMG');
        const result1=logo.length;
        expect(result1).toBe(1);
        
    });
    test("render app name as 'CoronaWatch'", () => {
        const app_name=wrapper.find('b');
        const result1=app_name.text();
        expect(result1).toBe("CoronaWatch");
        
    });
    test("render a link with text of `Health Agent`", () => {
        const user=wrapper.find('#user');
        const result1=user.text();
        expect(result1).toBe('Health Agent');
        
    });

    test("render nav items value of the list menu", () => {
        const item1=wrapper.find('#nav-item1');
        const result1=item1.text();
        expect(result1).toBe('Virus Information');
        
        const item2=wrapper.find('#nav-item2');
        const result2=item2.text();
        expect(result2).toBe('Regions Epidemic History');
        
    });
    

});