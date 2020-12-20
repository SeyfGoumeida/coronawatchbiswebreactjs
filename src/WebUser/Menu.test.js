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
    test("render a link with text of `Moderator`", () => {
        const user=wrapper.find('#user');
        const result1=user.text();
        expect(result1).toBe('Moderator');
        
    });

    test("render nav items value of the list menu", () => {
        const item1=wrapper.find('#nav-item1');
        const result1=item1.text();
        expect(result1).toBe('Home');
        
        const item2=wrapper.find('#nav-item2');
        const result2=item2.text();
        expect(result2).toBe('Articles');

        const item3=wrapper.find('#nav-item3');
        const result3=item3.text();
        expect(result3).toBe('Robots');

        const item4=wrapper.find('#nav-item4');
        const result4=item4.text();
        expect(result4).toBe('Inbox');

        const item5=wrapper.find('#nav-item5');
        const result5=item5.text();
        expect(result5).toBe('Health agent statistics');

        const item6=wrapper.find('#nav-item6');
        const result6=item6.text();
        expect(result6).toBe('Risk zones');

        const item7=wrapper.find('#nav-item7');
        const result7=item7.text();
        expect(result7).toBe('Client videos');

        const item8=wrapper.find('#nav-item8');
        const result8=item8.text();
        expect(result8).toBe('Log file');
        
    });
    

});