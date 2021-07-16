export default {
    swagger: '2.0',
    info: {
        version: '1.0.0',
        title: 'Math Database API',
        description: 'Nodejs + Express + MongoDB',
        license: {
            name: 'Facebook',
            url: 'https://www.facebook.com/giangkma/',
        },
    },
    host: 'math-database.herokuapp.com',
    basePath: '/api/v1',

    schemes: ['https', 'http'],

    tags: [
        {
            name: 'Auth',
            description: 'API for Auth in the system',
        },
        {
            name: 'Questions',
            description: 'API for Questions in the system',
        },
        {
            name: 'Ranks',
            description: 'API for Ranks in the system',
        },
        {
            name: 'Report',
            description: 'API for Report in the system',
        },
    ],

    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            value: 'kkskskks',
        },
    },

    consumes: ['application/json'],
    produces: ['application/json'],

    paths: {
        // ============================ AUTH API =============================
        '/auth/login': {
            post: {
                tags: ['Auth'],
                description: 'Login api',
                parameters: [
                    {
                        name: 'Form login',
                        in: 'body',
                        description: 'Login information of user',
                        schema: {
                            $ref: '#/definitions/loginPayload',
                        },
                    },
                ],
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'Login success',
                        schema: {
                            $ref: '#/definitions/authResponsive',
                        },
                    },
                },
            },
        },
        '/auth/register': {
            post: {
                tags: ['Auth'],
                description: 'Register api',
                parameters: [
                    {
                        name: 'Form register',
                        in: 'body',
                        description: 'Register information of user',
                        schema: {
                            $ref: '#/definitions/registerPayload',
                        },
                    },
                ],
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'Register success',
                        schema: {
                            $ref: '#/definitions/authResponsive',
                        },
                    },
                },
            },
        },
        '/auth/get-profile': {
            get: {
                tags: ['Auth'],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                description: 'Get user profile api',
                responses: {
                    '200': {
                        description: 'Get profile success',
                        schema: {
                            $ref: '#/definitions/authResponsive',
                        },
                    },
                },
            },
        },
        '/auth/update-profile': {
            put: {
                tags: ['Auth'],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                description: 'Update profile api',
                parameters: [
                    {
                        name: 'Form update profile',
                        in: 'body',
                        description: 'information of user',
                        schema: {
                            $ref: '#/definitions/updateProfilePayload',
                        },
                    },
                ],
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'UpdateProfile success',
                        schema: {
                            $ref: '#/definitions/userInfo',
                        },
                    },
                },
            },
        },
        '/auth/change-password': {
            put: {
                tags: ['Auth'],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                description: 'Change password api',
                parameters: [
                    {
                        name: 'Form change password',
                        in: 'body',
                        description: 'information of user',
                        schema: {
                            $ref: '#/definitions/changePasswordPayload',
                        },
                    },
                ],
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'Change password success',
                        schema: {
                            success: true,
                        },
                    },
                },
            },
        },

        // ============================ QUESTIONS API =============================
        '/questions': {
            post: {
                tags: ['Questions'],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                description: 'Create new Questions in system',
                parameters: [
                    {
                        name: 'question',
                        in: 'body',
                        description: 'question that we want to create',
                        schema: {
                            $ref: '#/definitions/questionPayload',
                        },
                    },
                ],
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'New question is created',
                        schema: {
                            $ref: '#/definitions/question',
                        },
                    },
                },
            },
            get: {
                tags: ['Questions'],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                summary: 'Get all questions in system',
                responses: {
                    '200': {
                        description: 'OK',
                        schema: {
                            $ref: '#/definitions/questions',
                        },
                    },
                },
            },
        },
        '/questions/{questionId}': {
            parameters: [
                {
                    name: 'questionId',
                    in: 'path',
                    required: true,
                    description: 'ID of question that we want to find',
                    type: 'string',
                },
            ],
            get: {
                tags: ['Questions'],
                security: [
                    {
                        Bearer: [],
                    },
                ],
                summary: 'Get question with given ID',
                responses: {
                    '200': {
                        description: 'question is found',
                        schema: {
                            $ref: '#/definitions/question',
                        },
                    },
                },
            },
            delete: {
                security: [
                    {
                        Bearer: [],
                    },
                ],
                summary: 'Delete question with given ID',
                tags: ['Questions'],
                responses: {
                    '200': {
                        description: 'question is deleted',
                        schema: {
                            $ref: '#/definitions/question',
                        },
                    },
                },
            },
            put: {
                security: [
                    {
                        Bearer: [],
                    },
                ],
                summary: 'Update question with give ID',
                tags: ['Questions'],
                parameters: [
                    {
                        name: 'question',
                        in: 'body',
                        description: 'question with new values of properties',
                        schema: {
                            $ref: '#/definitions/questionPayload',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'question is updated',
                        schema: {
                            $ref: '#/definitions/question',
                        },
                    },
                },
            },
        },

        // ============================ RANKS API =============================
        '/ranks/{className}': {
            parameters: [
                {
                    name: 'className',
                    in: 'path',
                    required: true,
                    description:
                        'class name for which you want to get the ranks',
                    type: 'string',
                },
            ],
            get: {
                security: [
                    {
                        Bearer: [],
                    },
                ],
                tags: ['Ranks'],
                description: 'get ranks in class api',
                responses: {
                    '200': {
                        description: 'get ranks success',
                        schema: {
                            $ref: '#/definitions/ranks',
                        },
                    },
                },
            },
        },

        // ============================ REPORT API =============================
        '/report': {
            get: {
                security: [
                    {
                        Bearer: [],
                    },
                ],
                tags: ['Report'],
                description: 'Get all reports api',
                responses: {
                    '200': {
                        description: 'Get all reports success',
                        schema: {
                            $ref: '#/definitions/reports',
                        },
                    },
                },
            },
        },
        '/report/{questionId}': {
            parameters: [
                {
                    name: 'questionId',
                    in: 'path',
                    required: true,
                    description: 'id of the question you want to report',
                    type: 'string',
                },
            ],
            post: {
                security: [
                    {
                        Bearer: [],
                    },
                ],
                tags: ['Report'],
                description: 'Send report api',
                responses: {
                    '200': {
                        description: 'Send report success',
                        schema: {
                            $ref: '#/definitions/report',
                        },
                    },
                },
            },
        },
        '/report/{reportId}': {
            parameters: [
                {
                    name: 'reportId',
                    in: 'path',
                    required: true,
                    description: 'id of the report you want delete',
                    type: 'string',
                },
            ],
            delete: {
                security: [
                    {
                        Bearer: [],
                    },
                ],
                tags: ['Report'],
                description: 'Delete report api',
                responses: {
                    '200': {
                        description: 'Delete report success',
                        schema: {
                            $ref: '#/definitions/report',
                        },
                    },
                },
            },
        },
    },
    definitions: {
        loginPayload: {
            required: ['username', 'password'],
            properties: {
                username: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
        },
        registerPayload: {
            required: ['name', 'username', 'password'],
            properties: {
                name: {
                    type: 'string',
                },
                username: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
        },
        authResponsive: {
            required: ['accessToken', 'information'],
            properties: {
                accessToken: {
                    type: 'string',
                },
                information: {
                    $ref: '#/definitions/userInfo',
                },
            },
        },
        userInfo: {
            required: ['id', 'role', 'name', 'username'],
            properties: {
                id: {
                    type: 'string',
                },
                role: {
                    type: 'string',
                },
                name: {
                    type: 'string',
                },
                username: {
                    type: 'string',
                },
                avatar: {
                    type: 'string',
                },
            },
        },
        changePasswordPayload: {
            required: ['password', 'newPassword'],
            properties: {
                password: {
                    type: 'string',
                },
                newPassword: {
                    type: 'string',
                },
            },
        },
        updateProfilePayload: {
            properties: {
                name: {
                    type: 'string',
                },
                avatar: {
                    type: 'string',
                },
            },
        },
        questionPayload: {
            required: ['question', 'answer', 'className', 'correctAnswer'],
            properties: {
                question: {
                    type: 'string',
                },
                answer: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                className: {
                    type: 'string',
                },
                correctAnswer: {
                    type: 'string',
                },
                chapter: {
                    type: 'string',
                },
            },
        },
        question: {
            required: [
                'id',
                'question',
                'answer',
                'className',
                'correctAnswer',
            ],
            properties: {
                id: {
                    type: 'string',
                    uniqueItems: true,
                },
                question: {
                    type: 'string',
                },
                answer: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                className: {
                    type: 'string',
                },
                correctAnswer: {
                    type: 'string',
                },
                chapter: {
                    type: 'string',
                },
            },
        },
        questions: {
            type: 'array',
            $ref: '#/definitions/question',
        },
        rank: {
            required: ['id', 'name', 'score'],
            properties: {
                id: {
                    type: 'string',
                    uniqueItems: true,
                },
                name: {
                    type: 'string',
                },
                score: {
                    type: 'number',
                },
                avatar: {
                    type: 'string',
                },
            },
        },
        ranks: {
            type: 'array',
            $ref: '#/definitions/rank',
        },
        report: {
            required: ['id', 'questionId', 'senders'],
            properties: {
                id: {
                    type: 'string',
                    uniqueItems: true,
                },
                questionId: {
                    type: 'number',
                },
                senders: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        },
        reports: {
            type: 'array',
            $ref: '#/definitions/report',
        },
    },
};
