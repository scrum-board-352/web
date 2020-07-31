const selectProjectByCreatorQuery = `
  query selectProjectByCreator($creator: String!, $authCheckInput: AuthCheckInput) {
    selectProjectByCreator(selectionInput: {
      projectInput: {
        creator: $creator
      }
      authCheckInput: $authCheckInput
    }) {
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

const selectProjectById = `
  query selectProjectById($projectId: String!, $authCheckInput: AuthCheckInput) {
    selectProjectById(selectionInput: {
      projectInput: {
        id: $projectId
      }
      authCheckInput: $authCheckInput
    }) {
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

export default { selectProjectByCreatorQuery, selectProjectById };
