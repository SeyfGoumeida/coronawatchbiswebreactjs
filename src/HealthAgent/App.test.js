import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("Health agent statistics Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<App/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());
        const btn1=wrapper.find('#search1');
        const result1=btn1.text();
        expect(result1).toBe('Search Country Details');

        const btn2=wrapper.find('#search2');
        const result2=btn2.text();
        expect(result2).toBe('Search Region Details');

        const btn3=wrapper.find('#insert');
        const result3=btn3.text();
        expect(result3).toBe('Insert Values');

        const btn4=wrapper.find('#insert_values');
        const result4=btn4.text();
        expect(result4).toBe('Insert new values');
        
        
    });

    test("render the initial value of state in a input", () => {
        const input1=wrapper.find('#nb_suspected');
        const result1=input1.text();
        expect(result1).toBe('');

        const input2=wrapper.find('#nb_recovered');
        const result2=input2.text();
        expect(result2).toBe('');

        const input3=wrapper.find('#nb_death');
        const result3=input3.text();
        expect(result3).toBe('');

        const input4=wrapper.find('#nb_confirmed');
        const result4=input4.text();
        expect(result4).toBe('');

        const input5=wrapper.find('#nb_notyetsick');
        const result5=input5.text();
        expect(result5).toBe('');
        
        
    });

    test("render the text of span", () => {
        const span1=wrapper.find('#span1');
        const result1=span1.text();
        expect(result1).toBe('Infected');

        const span2=wrapper.find('#span2');
        const result2=span2.text();
        expect(result2).toBe('Recovered');

        const span3=wrapper.find('#span3');
        const result3=span3.text();
        expect(result3).toBe('Deceased');

        const span4=wrapper.find('#span4');
        const result4=span4.text();
        expect(result4).toBe('Currently Sick');

        
        
    });

    test("render the text of headers", () => {
        const h5=wrapper.find('h5.card-title');
        const result1=h5.text();
        expect(result1).toBe('Statistics');

        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Virus Information');

        const modal=wrapper.find('h5.modal-title');
        const result3=modal.text();
        expect(result3).toBe(' INSERT NEW VALUES');
    });

});
