import deepMergeObject from './deepMergeObject';

function getProgramsConfig(programsConfig, playlistId, state) {
  const items = Object.values(programsConfig);
  const obj = items.find(
    o => o.playlistId === playlistId || o.videoGroupId === playlistId,
  );
  if (!obj) {
    return state;
  }
  return deepMergeObject(state, obj);
}

export default getProgramsConfig;
