const selectProjectByCreatorQuery = `
  query selectProjectByCreator($creator: String!) {
    selectProjectByCreator(selectionInput: {
      projectInput: {
        creator: $creator
      }
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
  query selectProjectById($projectId: String!) {
    selectProjectById(selectionInput: {
      projectInput: {
        id: $projectId
      }
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
