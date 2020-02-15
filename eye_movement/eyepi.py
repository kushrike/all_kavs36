from scipy.spatial import distance
from imutils import face_utils
import numpy as np
import time
import dlib
import cv2
import os
from eye_movement.gaze_tracking.gaze_tracking import GazeTracking
class EyeTracker():
    
    def __init__(self):
        
        EYE_ASPECT_RATIO_THRESHOLD = 0.3
        EYE_ASPECT_RATIO_CONSEC_FRAMES = 50
        COUNTER = 0
        self.face_cascade = cv2.CascadeClassifier("eye_movement/haarcascades/haarcascade_frontalface_default.xml")
        self.ans = []
        self.final_ans = []
        

        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor('eye_movement/shape_predictor_68_face_landmarks.dat')
        self.gaze = GazeTracking()
        (self.lStart, self.lEnd) = face_utils.FACIAL_LANDMARKS_IDXS['left_eye']
        (self.rStart, self.rEnd) = face_utils.FACIAL_LANDMARKS_IDXS['right_eye']
        
    def eye_aspect_ratio(self, eye):
            A = distance.euclidean(eye[1], eye[5])
            B = distance.euclidean(eye[2], eye[4])
            C = distance.euclidean(eye[0], eye[3])
            ear = (A+B) / (2*C)
            return ear
         
        
    def get_eye_direction(self):
        
        video_capture = cv2.VideoCapture(0)
        video_capture.set(cv2.CAP_PROP_FPS, 10)
        fps = video_capture.get(cv2.CAP_PROP_FPS)
        pos="center"
        frame_count = 70
        prev_a= (250, 300)
        prev_b = (350, 300)
        
        ret, frame = video_capture.read()
        print(ret)
        cnt=0
        while(True):
        
            ret, frame = video_capture.read()

            frame = cv2.flip(frame,1)
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            self.gaze.refresh(frame)
            frame = self.gaze.annotated_frame()
            faces = self.detector(gray, 0)

            face_rectangle = self.face_cascade.detectMultiScale(gray, 1.3, 5)

            for (x,y,w,h) in face_rectangle:
                cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)

            for face in faces:

                shape = self.predictor(gray, face)
                shape = face_utils.shape_to_np(shape)
                leftEye = shape[self.lStart:self.lEnd]
                rightEye = shape[self.rStart:self.rEnd]
                leftEyeAspectRatio = self.eye_aspect_ratio(leftEye)
                rightEyeAspectRatio = self.eye_aspect_ratio(rightEye)
                eyeAspectRatio = (leftEyeAspectRatio + rightEyeAspectRatio) / 2


                leftEyeHull = cv2.convexHull(leftEye)
                rightEyeHull = cv2.convexHull(rightEye)

                a=self.gaze.pupil_left_coords()
                b=self.gaze.pupil_right_coords()

                if(a is None or b is None):
                    cv2.putText(frame, "pupil not detected", (150,200), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 2) 
                    cnt = 0
                    frame_count = 70
                    continue


                if cnt >=  20 and cnt <= 30:
                    prev_a = a
                    prev_b = b
                    print(prev_a, prev_b)

                 
                elif cnt == 70:
                    cv2.putText(frame, "start", (150,200), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 2)

                ##initial frames ignored to consider set up time
                elif cnt>70:
                    if(cnt>= frame_count):
                        if(prev_a[0]<a[0] and prev_b[0]<b[0]):
                            pos="right"

                        elif(prev_a[0]>a[0] and prev_b[0]>b[0]):
                            pos="left"


                        if(cnt == frame_count+10):
                            frame_count+=30
                            prev_a= a
                            prev_b= b
                            cv2.putText(frame, pos, (150,200), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 2)

                        if(pos == "left"):
                            self.ans.append(1)
                        else:
                            self.ans.append(0)

                
                cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
                cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)
                cv2.circle(frame, a, 3, (0, 255, 0), -1)
                #
                cv2.circle(frame, b, 3, (0, 255, 0), -1)
                cv2.imshow('Video', frame)

            cnt+=1
            if(cnt == 370):
                break
            if(cv2.waitKey(1) & 0xFF == ord('q')):
                break
        video_capture.release()
        cv2.destroyAllWindows()

        i = 0

        while(i<len(self.ans)-10):
            val=0;
            for j in range (i, i+10):
                val+=self.ans[i]
            val/=10
            if val>=0.5:
                self.final_ans.append(1)
            else:
                self.final_ans.append(0)
        
            i+=10
        
        return self.final_ans
