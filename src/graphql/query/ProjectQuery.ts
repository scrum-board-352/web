const selectProjectByCreatorQuery = `
  query selectProjectByCreator($creator: String!) {
    selectProjectByCreator(creator: $creator) {
        id
        name: projectName
        creator
        teamId
        createTime
        col: colTitle
        row: rowTitle
        iteration
      }
  }
`;

export default { selectProjectByCreatorQuery };
