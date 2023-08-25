export const generateUniqueCircleCode = async circlesRef => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const codeLength = 6;

  while (true) {
    let circleCode = '';
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      circleCode += characters[randomIndex];
    }

    const isUnique = await isCircleCodeUnique(circlesRef, circleCode);
    if (isUnique) {
      return circleCode;
    }
  }
};

export const isCircleCodeUnique = async (circlesRef, circleCode) => {
  const querySnapshot = await circlesRef
    .where('circleCode', '==', circleCode)
    .get();
  return querySnapshot.empty;
};
