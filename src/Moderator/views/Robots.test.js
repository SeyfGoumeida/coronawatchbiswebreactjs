import React from "react";
import { shallow } from "enzyme";
import Robots from "./Robots";

describe("Robots Testing", ()=>{
    let wrapper;
    beforeEach(()=> {
        wrapper = shallow(<Robots/>);
    });
    test("render buttons", () => {
        const btn1=wrapper.find('#btn1');
        const result1=btn1.text();
        expect(result1).toBe('CHECK CONTENT');

        const btn2=wrapper.find('#btn2');
        const result2=btn2.text();
        expect(result2).toBe('CHECK CONTENT');

        const btn3=wrapper.find('#btn3');
        const result3=btn3.text();
        expect(result3).toBe('CHECK CONTENT');
        
    });

    test("render the text of headers", () => {
        const h4_facebook=wrapper.find('#h4_facebook');
        const result1=h4_facebook.text();
        expect(result1).toBe('FACEBOOK POSTS');

        const h1=wrapper.find('h1');
        const result2=h1.text();
        expect(result2).toBe('Robots Content');

        const h4_youtube=wrapper.find('#h4_youtube');
        const result3=h4_youtube.text();
        expect(result3).toBe('YOUTUBE VIDEOS');

        const h4_web=wrapper.find('#h4_web');
        const result4=h4_web.text();
        expect(result4).toBe('WEBSITES ARTICLES');

    });

});