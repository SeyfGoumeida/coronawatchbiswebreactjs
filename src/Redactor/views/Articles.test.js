import React from "react";
import { shallow } from "enzyme";
import Articles from "./Articles";

describe("Redactor Articles Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Articles/>);
    });
    test("render buttons", () => {
        //console.log(wrapper.debug());
        const btn1=wrapper.find('#add-btn');
        const result1=btn1.text();
        expect(result1).toBe('ADD NEW ARTICLE');

        const btn2=wrapper.find('#save-btn');
        const result2=btn2.text();
        expect(result2).toBe('Save');
        
        
    });

    test("render the initial value of state in a input", () => {
        const titre=wrapper.find('#titre1');
        const result1=titre.text();
        expect(result1).toBe('');

        const contenu=wrapper.find('#contenu1');
        const result2=contenu.text();
        expect(result2).toBe('');

        const file=wrapper.find('#file1');
        const result3=file.text();
        expect(result3).toBe('');
        
    });

    test("render the text of headers", () => {
        const h5=wrapper.find('h5.card-title');
        const result1=h5.text();
        expect(result1).toBe('Articles');

        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Articles');
    });

});
