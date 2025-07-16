export const FIELD_TYPES = [
    {
        label: '文本',
        value: 'string',
    },
    {
        label: '数字',
        value: 'number',
    },
    {
        label: '布尔',
        value: 'boolean',
    },
    {
        label: '对象',
        value: 'object',
    },
    {
        label: '数组',
        value: 'array',
    },
] as const;

export type SchemaType = (typeof FIELD_TYPES)[number]['value'];
export interface FieldItem {
    key: string;
    title: string;
    type: SchemaType;
    required: 0 | 1;
    description: string;
    children?: FieldItem[];
    sortedProps: string[];
    usedByScrollIntoView?: 1;
}
export interface JsonSchema {
    type: SchemaType;
    title: string;
    description: string;
    properties?: { [key: string]: JsonSchema };
    items?: JsonSchema;
    required?: string[];
    sortedProps: string[];
}

/**
 * 生成器的表单项 转为 schema 格式的数据
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/schema.html#form2Schema
 */
export function form2Schema(input: FieldItem): JsonSchema {
    const schema: JsonSchema = { type: input.type, title: input.title, description: input.description, sortedProps: [] };

    if (input.type === 'object') {
        schema.properties = {};
        schema.required = [];
        schema.sortedProps = input.sortedProps;
        if (input.sortedProps && input.sortedProps.length > 0) {
            input.sortedProps.forEach(key => {
                if (!input.children || input.children.length === 0) return;
                const child = input.children.find(c => c.key === key);
                if (!child) return;
                if (child.required) {
                    schema.required?.push(child.key);
                }
                schema.properties![child.key] = form2Schema(child);
            });
        }
    } else if (input.type === 'array' && input.children && input.children.length > 0) {
        schema.items = form2Schema(input.children[0]);
    }

    return schema;
}

/**
 * schema 格式的数据 转为 生成器的表单项
 * 文档地址：https://release.group-ds.com/dev-newbee-handbook/utils/schema.html#schema2form
 */
export function schema2Form(schema: JsonSchema): FieldItem {
    const input: FieldItem = {
        type: schema.type,
        title: schema.title,
        description: schema.description,
        key: schema.items ? 'items' : 'root',
        required: 1,
        sortedProps: schema.sortedProps,
    };

    if (schema.type === 'object') {
        input.children = [];
        if (schema.properties) {
            if (!schema.sortedProps?.length) {
                schema.sortedProps = Object.keys(schema.properties) as string[];
            }
            schema.sortedProps?.forEach(key => {
                const childSchema = schema.properties![key];
                const childItem = schema2Form(childSchema);
                childItem.key = key;
                if (schema.required && schema.required.includes(key)) {
                    childItem.required = 1;
                } else {
                    childItem.required = 0;
                }
                input.children!.push(childItem);
            });
        }
    } else if (schema.type === 'array' && schema.items) {
        const childItem = schema2Form(schema.items);
        input.children = [childItem];
    }

    return input;
}
