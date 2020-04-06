const selectProjectByCreatorQuery = `
  query selectProjectByCreator($creator: String!, $uid: String) {
    selectProjectByCreator(selectionInput: {
      projectInput: {
        creator: $creator
      }
      uid: $uid
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
  query selectProjectById($projectId: String!, $uid: String) {
    selectProjectById(selectionInput: {
      projectInput: {
        id: $projectId
      }
      uid: $uid
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
