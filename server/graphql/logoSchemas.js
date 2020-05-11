var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');

var textArrayObject = new GraphQLObjectType({
    name: 'textArrayObject',
    fields: function () {
        return {
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize:{
                type: GraphQLInt
            },
            x:{
                type: GraphQLInt
            },
            y:{
                type: GraphQLInt
            }
        }
    }
})
var textArrayInput = new GraphQLInputObjectType({
    name: 'textArrayInput',
    fields: function () {
        return {
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize:{
                type: GraphQLInt
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            }
        }
    }
})

var imageArrayObj = new GraphQLObjectType({
    name: 'imageArrayObj',
    fields: function () {
        return {
            image: {
                type: GraphQLString
            },
            imageHeight: {
                type: GraphQLInt
            },
            imageWidth:{
                type: GraphQLInt
            },
            imageX:{
                type: GraphQLInt
            },
            imageY:{
                type: GraphQLInt
            }
        }
    }
})
var imageArrayInput = new GraphQLInputObjectType({
    name: 'imageArrayInput',
    fields: function () {
        return {
            image: {
                type: GraphQLString
            },
            imageHeight: {
                type: GraphQLInt
            },
            imageWidth:{
                type: GraphQLInt
            },
            imageX:{
                type: GraphQLInt
            },
            imageY:{
                type: GraphQLInt
            }
        }
    }
})

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            textArray: {
                type: GraphQLList(textArrayObject)
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderWidth: {
                type: GraphQLInt
            },
            borderRadius: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            imageArray: {
                type: GraphQLList(imageArrayObj)
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            },
            getLogoByText: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: params.text}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            },
            getLogosByTextContains: {
                type: new GraphQLList(logoType),
                args: {
                    text: {
                        name: 'text',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params){
                    const logos = LogoModel.find({text: {$regex: params.text, $options: 'i'}}).exec();
                    if (!logos) {
                        throw new Error('Error');
                    }
                    return logos;
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    textArray: {
                        type: new GraphQLNonNull(new GraphQLList(textArrayInput)),
                        args: {
                            text: {type: new GraphQLNonNull(GraphQLString)},
                            color: {type: new GraphQLNonNull(GraphQLString)},
                            fontSize: {type: new GraphQLNonNull(GraphQLInt)},
                            x: {type: new GraphQLNonNull(GraphQLInt)},
                            y: {type: new GraphQLNonNull(GraphQLInt)},
                        }
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageArray: {
                        type: new GraphQLNonNull(new GraphQLList(imageArrayInput)),
                        args: {
                            image: {type: new GraphQLNonNull(GraphQLString)},
                            imageHeight: {type: new GraphQLNonNull(GraphQLInt)},
                            imageWidth: {type: new GraphQLNonNull(GraphQLInt)},
                            imageX: {type: new GraphQLNonNull(GraphQLInt)},
                            imageY: {type: new GraphQLNonNull(GraphQLInt)},
                        }
                    },
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    textArray: {
                        type: new GraphQLNonNull(new GraphQLList(textArrayInput)),
                        args: {
                            text: {type: new GraphQLNonNull(GraphQLString)},
                            color: {type: new GraphQLNonNull(GraphQLString)},
                            fontSize: {type: new GraphQLNonNull(GraphQLInt)},
                            x: {type: new GraphQLNonNull(GraphQLInt)},
                            y: {type: new GraphQLNonNull(GraphQLInt)},
                        }
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    imageArray: {
                        type: new GraphQLNonNull(new GraphQLList(imageArrayInput)),
                        args: {
                            image: {type: new GraphQLNonNull(GraphQLString)},
                            imageHeight: {type: new GraphQLNonNull(GraphQLInt)},
                            imageWidth: {type: new GraphQLNonNull(GraphQLInt)},
                            imageX: {type: new GraphQLNonNull(GraphQLInt)},
                            imageY: {type: new GraphQLNonNull(GraphQLInt)},
                        }
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id,
                        { textArray: params.textArray, backgroundColor : params.backgroundColor, 
                            borderColor : params.borderColor, borderWidth: params.borderWidth,
                            borderRadius: params.borderRadius, padding: params.padding, 
                            margin: params.margin, height: params.height, width: params.width, 
                            imageArray: params.imageArray, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });