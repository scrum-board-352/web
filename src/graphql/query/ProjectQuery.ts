const selectProjectByCreatorQuery = `
  query selectProjectByCreator($creator: String!) {
    selectProjectByCreator(creator: $creator) {
        id
        projectName
        creator
        teamId
        createTime
        colTitle
        rowTitle
        iteration
      }
  }
`;

export default { selectProjectByCreatorQuery };
