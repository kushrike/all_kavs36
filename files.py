from azure.storage.file import FileService

file_service = FileService(account_name='adhd', account_key='hbJ5OF3n7I5fNwy/30m44JX7flAJQ0FC32RLwfNM27+NcV4BurnLVRypS2+M+28+j+rwtPgZTxVwO8p7Rv649Q==')

# file_service.create_share('myshare')

# file_service.create_directory('myshare', 'sampledir')

generator = file_service.list_directories_and_files('myshare')
for file_or_dir in generator:
    print(file_or_dir.name)
    
from azure.storage.file import ContentSettings
file_service.create_file_from_path(
    'hack36',
    'hack36',  # We want to create this blob in the root directory, so we specify None for the directory_name
    'file1',
    '86282.jpg',
    content_settings=ContentSettings(content_type='image/jpg'))

file_service.get_file_to_path('myshare', None, 'myfile', 'out.jpg')