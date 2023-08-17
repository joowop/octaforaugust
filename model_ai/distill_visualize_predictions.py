import supervision as sv
import cv2

img_path = "./images/your-image.jpeg"

image = cv2.imread(img_path)

detections = base_model.predict(img_path)
# annotate image with detections
box_annotator = sv.BoxAnnotator()

labels = [
    f"{base_model.ontology.classes()[class_id]} {confidence:0.2f}"
    for _, _, confidence, class_id, _ in detections
]

annotated_frame = box_annotator.annotate(
    scene=image.copy(), detections=detections, labels=labels
)

sv.plot_image(annotated_frame, (16, 16))