'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class SearchResult extends Model {
    static associate(models) {
      this.belongsTo(models.SearchHistory, {
        foreignKey: 'searchId',
        as: 'search',
      })
    }
  }
  SearchResult.init(
    {
      searchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'SearchHistories',
          key: 'id',
        },
      },
      catId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: 'SearchResult',
      tableName: 'SearchResults',
      timestamps: true,
    },
  )
  return SearchResult
}
