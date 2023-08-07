Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
Set F = FSO.GetFile(Wscript.ScriptFullName)
path = FSO.GetParentFolderName(F)
path1 = Replace(path,"gulp","node_modules")
path2 = Replace(path,"gulp","валидатор.vbs")
path3 = Replace(path,"gulp","старт.vbs")
	FSO.DeleteFile FSO.BuildPath(path1, "*.*"), True
FSO.DeleteFile FSO.BuildPath(path2, "*.*"), True
FSO.DeleteFile FSO.BuildPath(path3, "*.*"), True
FSO.DeleteFile FSO.BuildPath(path, "*.*"), True