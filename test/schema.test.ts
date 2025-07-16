import { describe, expect, it } from 'vitest';
import { form2Schema, schema2Form } from '../src';

// 使用 vitest 帮我测试这两个方法是否正确
describe('form2Schema and schema2Form should be correct', () => {
    it('schema2Form should be correct', () => {
        const schema = schema2Form({
            type: 'object',
            title: '对象',
            sortedProps: ['a', 'b'],
            description: '对象描述',
            required: ['a'],
            properties: {
                a: {
                    type: 'string',
                    title: 'a',
                    description: 'a',
                    sortedProps: ['a'],
                },
                b: {
                    type: 'string',
                    title: 'b',
                    description: 'b',
                    sortedProps: ['b'],
                },
            },
        });
        expect(schema).toMatchInlineSnapshot(`
          {
            "children": [
              {
                "description": "a",
                "key": "a",
                "required": 1,
                "sortedProps": [
                  "a",
                ],
                "title": "a",
                "type": "string",
              },
              {
                "description": "b",
                "key": "b",
                "required": 0,
                "sortedProps": [
                  "b",
                ],
                "title": "b",
                "type": "string",
              },
            ],
            "description": "对象描述",
            "key": "root",
            "required": 1,
            "sortedProps": [
              "a",
              "b",
            ],
            "title": "对象",
            "type": "object",
          }
        `);
    });

    it('form2Schema should be correct', () => {
        const schema = form2Schema({
            children: [
                {
                    description: 'a',
                    key: 'a',
                    required: 1,
                    sortedProps: ['a'],
                    title: 'a',
                    type: 'string',
                },
                {
                    description: 'b',
                    key: 'b',
                    required: 0,
                    sortedProps: ['b'],
                    title: 'b',
                    type: 'string',
                },
            ],
            description: '对象描述',
            key: 'root',
            required: 1,
            sortedProps: ['a', 'b'],
            title: '对象',
            type: 'object',
        });
        expect(schema).toMatchInlineSnapshot(`
          {
            "description": "对象描述",
            "properties": {
              "a": {
                "description": "a",
                "sortedProps": [],
                "title": "a",
                "type": "string",
              },
              "b": {
                "description": "b",
                "sortedProps": [],
                "title": "b",
                "type": "string",
              },
            },
            "required": [
              "a",
            ],
            "sortedProps": [
              "a",
              "b",
            ],
            "title": "对象",
            "type": "object",
          }
        `);
    });
});
