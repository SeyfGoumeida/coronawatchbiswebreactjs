import React from "react";
import { shallow } from "enzyme";
import Inbox from "./Inbox";

describe("Inbox Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Inbox/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());

        
        
    });

    test("render the text of headers", () => {
        const h3=wrapper.find('h3.card-title');
        const result1=h3.text();
        expect(result1).toBe('Inbox');

        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Inbox');
    });

    test("render the header of table", () => {
        const th1=wrapper.find('#th1');
        const result1=th1.text();
        expect(result1).toBe('Username');

        const th2=wrapper.find('#th2');
        const result2=th2.text();
        expect(result2).toBe('Date');

        const th3=wrapper.find('#th3');
        const result3=th3.text();
        expect(result3).toBe('Address');

        const th4=wrapper.find('#th4');
        const result4=th4.text();
        expect(result4).toBe('State');

        const th5=wrapper.find('#th5');
        const result5=th5.text();
        expect(result5).toBe('More');
    });

});