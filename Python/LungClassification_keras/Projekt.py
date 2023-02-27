import numpy as np
import matplotlib.pyplot as plt
import glob
from keras.preprocessing.image import ImageDataGenerator
from keras.utils import load_img, img_to_array
from keras.models import Sequential
from keras.layers import Conv2D
from keras.layers import Dropout, Flatten, Dense, MaxPool2D

DATASET_DIR = "./covid19-radiography-database"

normal_images = []
count = 0
count2 = 0

for img_path in glob.glob(DATASET_DIR + "/NORMAL/*"):
    count += 1
    normal_images.append(load_img(str(img_path), target_size=(150, 150, 3)))
    if count > 550:
        break

fig = plt.figure()
fig.suptitle("Normal Lungs")
plt.imshow(normal_images[0], cmap="gray")
plt.show()


covid_images = []
for img_path in glob.glob(DATASET_DIR + "/COVID-19/*"):
    count2 += 1
    covid_images.append(load_img(str(img_path), target_size=(150, 150, 3)))
    if count2 > 550:
        break

fig = plt.figure()
fig.suptitle("Covid-19 Patient's Lungs ")
plt.imshow(covid_images[0], cmap="gray")
plt.show()


print(str(len(normal_images))+" normal patient images")
print(str(len(covid_images))+" covid patient images")

images_together = []

for i in normal_images:
    images_together.append(img_to_array(i))

for i in covid_images:
    images_together.append(img_to_array(i))

targets = np.zeros(len(images_together))
targets[:len(normal_images) - 1] = 1  # normal-> 1, covid-19-> 0
targets = np.array(targets)
print("targets: ",targets.shape)
targets = targets.reshape(-1,1)
print("new shape of targets: ",targets.shape)

images_together = np.array(images_together)
print("shape of images together: ",images_together.shape)

from sklearn.model_selection import train_test_split
X_train, X_val, y_train, y_val = train_test_split(images_together, targets, test_size=0.25, stratify=targets)

images_together = np.concatenate((X_train, X_val))
targets = np.concatenate((y_train, y_val))


IMG_W = 150
IMG_H = 150
CHANNELS = 3

EPOCHS = 32
BATCH_SIZE = 40


model = Sequential()
model.add(Conv2D(filters = 32, kernel_size = (3,3), input_shape =(150,150,3), activation = "relu"))
model.add(MaxPool2D(pool_size = (2,2)))

model.add(Conv2D(filters = 64, kernel_size = (3,3), activation = "relu"))
model.add(MaxPool2D(pool_size = (2,2)))

model.add(Conv2D(filters = 128, kernel_size = (3,3), activation = "relu"))
model.add(MaxPool2D(pool_size = (2,2), strides = (1,1)))
model.add(Dropout(0.25))


model.add(Flatten())
model.add(Dense(64, activation = "relu"))
model.add(Dropout(0.2))
model.add(Dense(1, activation = "sigmoid"))

model.compile(loss = "binary_crossentropy",
             optimizer = "adam",
             metrics = ["accuracy"])


train_datagen = ImageDataGenerator(rescale = 1./255,
                                  shear_range = 0.2,
                                  zoom_range = 0.2,
                                  horizontal_flip = True,
                                  validation_split = 0.25)


train_generator = train_datagen.flow(
images_together, targets,
batch_size = BATCH_SIZE,
subset = "training")

validation_generator = train_datagen.flow(
images_together, targets,
batch_size = BATCH_SIZE,
shuffle = False,
subset = "validation")

#fitting
hist = model.fit_generator(
train_generator,
steps_per_epoch = 10,
validation_data = validation_generator,
validation_steps = 4,
epochs = EPOCHS)



plt.figure(figsize = (13,7))
plt.plot(hist.history["accuracy"])
plt.plot(hist.history["val_accuracy"])
plt.title("Model Accuracy")
plt.ylabel("Accuracy")
plt.xlabel("Epoch")
plt.legend(["Train", "Test"], loc = "upper left")
plt.show()

print("Training Accuracy: "+str(np.round(hist.history["accuracy"][-1]*100,2))+"%")
print("Validation Accuracy: "+str(np.round(hist.history["val_accuracy"][-1]*100,2))+"%")

