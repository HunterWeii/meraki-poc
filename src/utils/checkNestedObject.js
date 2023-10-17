import get from '@/utils/getDeeplyNestedItems';

function checkNestedObject(obj, path, defaultValue) {
  return get(obj, path, defaultValue);
}

export default checkNestedObject;
