import { useState, useCallback } from 'react';
import { Annotation, AnnotationParams } from '../interfaces/annotation';
import { generateRandomId } from '../helpers/generalHelpers';

const useAnnotations = (defaultAnnotations: Array<Annotation>) => {
  const [annotations, setAnnotations] = useState<Array<Annotation>>(defaultAnnotations);

  const getAnnotationsForPage = useCallback((page: number): Array<Annotation> => {
    return annotations.filter((annotation: Annotation) => annotation.page === page);
  }, [annotations]);

  const addAnnotation = useCallback((annotation: AnnotationParams) => {
    const newAnnotation: Annotation = {
      id: generateRandomId(10),
      ...annotation
    };
    const newAnnotations = [...annotations, newAnnotation];
    setAnnotations(newAnnotations);
  }, [annotations]);

  const removeAnnotation = useCallback((id) => {
    if (typeof id === 'number') id = id.toString()
    const remainingAnnotations = annotations.filter((a) => !id.includes(a.id.toString()))
    setAnnotations(remainingAnnotations)
  }, [annotations]);

  return { annotations, setAnnotations, getAnnotationsForPage, addAnnotation, removeAnnotation };
};

export default useAnnotations;
